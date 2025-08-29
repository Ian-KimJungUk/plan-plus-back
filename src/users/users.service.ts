import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvider, UserProvider } from './entities/user-provider.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProvider)
    private readonly userProvider: Repository<UserProvider>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      userProviders: [
        {
          provider: AuthProvider.local,
          providerId: createUserDto.email,
        },
      ],
    });
    return await this.userRepository.save(user);
  }

  async findOneByProviderId(providerId: string) {
    return await this.userRepository
      .createQueryBuilder('a')
      .innerJoinAndSelect(
        'a.userProviders',
        'b',
        'b.providerId = :providerId',
        { providerId },
      )
      .getOne();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
