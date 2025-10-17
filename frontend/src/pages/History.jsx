import { Title } from '@mantine/core'
import HistoryList from '../components/HistoryList'

export default function History() {
  return (
    <>
      <Title order={3} mb="md">History</Title>
      <HistoryList />
    </>
  )
}
