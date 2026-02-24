import process from 'node:process'
import { addTemplate, defineNuxtModule, useLogger } from 'nuxt/kit'
import { $fetch } from 'ofetch'
import { generateDirectusTypes } from 'directus-sdk-typegen'

interface ModuleOptions {
  /**
   * The URL of the Directus instance, for example, 'https://directus.example.com'
   */
  directusUrl: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'directus',
    configKey: 'directus',
  },

  async setup(options) {
    if (import.meta.test) return

    const logger = useLogger('directus').withTag('module')

    if (!options.directusUrl) {
      logger.warn('directusUrl not provided, skipping schema generation')
      return
    }

    if (!process.env.DIRECTUS_TOKEN) {
      logger.warn('DIRECTUS_TOKEN not set, skipping GraphQL schema generation')
      return
    }

    try {
      const schema = await $fetch<string>(
        `${options.directusUrl}/server/specs/graphql`,
        {
          headers: {
            Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
          },
          responseType: 'text',
        },
      )

      // write the raw schema file (used for codegen or other tools)
      addTemplate({
        filename: '../graphql/schema.graphql',
        getContents: () => schema,
        write: true,
      })

      // generate TypeScript interfaces from the Directus collections
      // and combine them with the GraphQL schema so consumers can import
      // both from a single declaration file
      let directusTypes: string = ''
      try {
        directusTypes = await generateDirectusTypes({
          directusUrl: options.directusUrl,
          directusToken: process.env.DIRECTUS_TOKEN as string,
        })
      } catch (err) {
        // if type generation fails we still want to continue but log the error
        logger.error('Failed to generate Directus collection types')
        logger.error(err)
      }

      // output the combined declaration into the project `types` folder
      addTemplate({
        filename: 'types/directus.d.ts',
        getContents: () =>
          directusTypes
            .replaceAll(/\bid\b/g, '_id')
            .replaceAll(/_id: number;/g, '_id?: string;')
            .replaceAll(/_id: string;/g, '_id?: string;'),
        write: true,
      })

      logger.success('Generated GraphQL schema in graphql/schema.graphql')
      logger.success('Generated TypeScript types in types/directus.d.ts')
    } catch (error) {
      logger.error('Failed to generate GraphQL schema')
      logger.error(error)
    }
  },
})
