import BaseService from '../service/base'

export default abstract class BaseCommand {
  service: BaseService

  constructor(service: BaseService) {
    this.service = service
  }

  abstract apply(): void
}
