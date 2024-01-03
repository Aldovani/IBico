import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { OpportunitySkillList } from './opportunity-skill-list'
import { Author } from './author'

export type OpportunityStatus = 'CREATED' | 'PENDING' | 'CLOSED' | 'DISABLED'

export type OpportunityProps = {
  title: string
  description: string
  amount: number
  local: string
  status: OpportunityStatus
  candidateId: UniqueEntityId | null
  authorId: UniqueEntityId
  startDateTime: Date
  endDateTime: Date
  timeLoad: string
  opportunityClosedTime: Date | null
  createdAt: Date
  skills: OpportunitySkillList
  Author?: Author
}

export class Opportunity extends Entity<OpportunityProps> {
  static create(
    props: Optional<
      OpportunityProps,
      'createdAt' | 'opportunityClosedTime' | 'status' | 'candidateId'
    >,
    id?: UniqueEntityId,
  ) {
    const opportunity = new Opportunity(
      {
        ...props,
        createdAt: new Date(),
        status: props.status || 'CREATED',
        candidateId: props.candidateId || null,
        opportunityClosedTime: null,
      },
      id,
    )

    return opportunity
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get amount() {
    return this.props.amount
  }

  set amount(amount: number) {
    this.props.amount = amount
  }

  get local() {
    return this.props.local
  }

  set local(local: string) {
    this.props.local = local
  }

  get status() {
    return this.props.status
  }

  set status(status: OpportunityStatus) {
    this.props.status = status
  }

  get candidateId() {
    return this.props.candidateId
  }

  set candidateId(candidateId: UniqueEntityId | null) {
    this.props.candidateId = candidateId
  }

  get authorId() {
    return this.props.authorId
  }

  get startDateTime() {
    return this.props.startDateTime
  }

  set startDateTime(startDateTime: Date) {
    this.props.startDateTime = startDateTime
  }

  get endDateTime() {
    return this.props.endDateTime
  }

  set endDateTime(endDateTime: Date) {
    this.props.endDateTime = endDateTime
  }

  get opportunityClosedTime() {
    return this.props.opportunityClosedTime
  }

  set opportunityClosedTime(date: Date | null) {
    this.props.opportunityClosedTime = date
  }

  get timeLoad() {
    return this.props.timeLoad
  }

  set timeLoad(time: string) {
    this.props.timeLoad = time
  }

  get createdAt() {
    return this.props.createdAt
  }

  get skills() {
    return this.props.skills
  }

  set skills(skills: OpportunitySkillList) {
    this.props.skills = skills
  }

  get Author() {
    return this.props.Author
  }
}
