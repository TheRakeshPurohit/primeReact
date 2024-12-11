import {BaseStyles} from '.'
import type {Meta} from '@storybook/react'
import React from 'react'
import type {ComponentProps} from './utils/types'

export default {
  title: 'Behaviors/BaseStyles/Dev',
  component: BaseStyles,
} as Meta<ComponentProps<typeof BaseStyles>>

export const Default = () => <BaseStyles>Hello</BaseStyles>