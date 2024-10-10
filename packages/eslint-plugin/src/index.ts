import configsFlat from './configs/flat'
import configsRecommended from './configs/recommended'
import { plugin } from './plugin'
import './types'

export default {
  ...plugin,
  configs: {
    recommended: configsRecommended,
    flat: configsFlat,
  },
}
