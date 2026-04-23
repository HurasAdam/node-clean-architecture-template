import { ITagRepository } from "../domain/tag.repository.interface";
import { CreateTagDto } from "../dto/create-tag.dto";

export class TagService {
  private tagRepository;
  constructor(tagRepository: ITagRepository) {
    this.tagRepository = tagRepository;
  }

  create(data: CreateTagDto) {
    return this.tagRepository.create(data);
  }

  find() {
    this.tagRepository.find();
  }

  findOne() {
    this.tagRepository.findOne();
  }

  updateOne(data) {
    this.tagRepository.updateOne(data);
  }

  deleteOne(id: string) {
    this.tagRepository.deleteOne(id);
  }
}
