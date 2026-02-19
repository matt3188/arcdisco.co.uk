import process from 'node:process'
import { addTemplate, defineNuxtModule, useLogger } from 'nuxt/kit'
import { $fetch } from 'ofetch'

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

      addTemplate({
        filename: '../graphql/schema.graphql',
        getContents: () => schema,
        write: true,
      })

      logger.success('Generated GraphQL schema in graphql/schema.graphql')
    } catch (error) {
      logger.error('Failed to generate GraphQL schema')
      logger.error(error)
    }
  },
})
