import { Meta, StoryObj } from '@storybook/react'
import { FiEye } from 'react-icons/fi'
import { Input } from './index'

const InputComplete = () => (
  <Input.Label id="input" name="Input">
    <Input.Wrapper>
      <Input.Field></Input.Field>
      <Input.Icon
        icon={<FiEye />}
        onClick={() => {
          console.log('aqui')
        }}
      />
    </Input.Wrapper>
  </Input.Label>
)

export default {
  title: 'components/Input',
  component: InputComplete,
} as Meta

export const Primary: StoryObj = {}
