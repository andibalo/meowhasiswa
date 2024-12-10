import { config as configBase } from '@tamagui/config/v3'
import { colors } from './constants/Colors'
import { createTamagui } from 'tamagui'

const conf = {
  ...configBase,
  tokens: {
    ...configBase.tokens,
    color: {
      ...configBase.tokens.color,
      primary: colors.primaryLight,
      secondary: colors.secondaryLight,
      accent: colors.accentLight,
      accentTint: colors.accentTintLight
    }
  }
}

export const config = createTamagui(conf)

export default config

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf { }
}
