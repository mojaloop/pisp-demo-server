/*****
 License
 --------------
 Copyright © 2020 Mojaloop Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the 'License') and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Google
 - Steven Wijaya <stevenwjy@google.com>
 --------------
 ******/

import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import { Server, ServerRegisterPluginObject } from '@hapi/hapi'
import Blipp from 'blipp'

import { OpenApi, OpenApiOpts } from './openAPI'
import { extHandlers } from '../handlers/openApiHandlers'
import { apiHandlers as appApiHandlers } from '~/server/handlers/app'
import { apiHandlers as mojaloopApiHandlers } from '~/server/handlers/mojaloop'

const openApiOpts: OpenApiOpts = {
  baseHost: 'pisp-demo-server.local',
  definition: {
    app: './dist/openapi/app.yaml',
    mojaloop: './dist/openapi/mojaloop.yaml',
  },
  quick: false,
  strict: true,
  handlers: {
    api: {
      app: appApiHandlers,
      mojaloop: mojaloopApiHandlers
    },
    ext: extHandlers,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const plugins: Array<ServerRegisterPluginObject<any>> = [
  { plugin: Inert },
  { plugin: Vision },
  { plugin: Blipp },
  {
    plugin: OpenApi,
    options: openApiOpts,
  }
]

async function register(server: Server): Promise<Server> {
  await server.register(plugins)
  return server
}

export default {
  register,
  plugins,
}
