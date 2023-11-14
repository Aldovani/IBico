import { Meta, StoryObj } from '@storybook/react'
import { FiEye } from 'react-icons/fi'
import { Input } from './index'

const InputComplete = () => (
  <Input.Label id="input" name="Input">
    <Input.Field>
      <Input.Icon icon={<FiEye />} />
    </Input.Field>
  </Input.Label>
)

export default {
  title: 'components/Input',
  component: InputComplete,
} as Meta

export const Primary: StoryObj = {}
