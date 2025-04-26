import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  // @Exclude() // password 를 response에 안보여주기 위해서
  public password: string;

  @Column({ nullable: true })
  public profileImg: string;

  @BeforeInsert()
  async beforeInsert() {
    try {
      // 패스워드 암호화
      if (this.password) {
        const salt = await bcrypt.genSalt(10); // salt는 암호화 key값 같은거
        this.password = await bcrypt.hash(this.password, salt);
      }

      // 프로필 이미지를 자동 생성
      this.profileImg = gravatar.url(this.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
        protocol: 'https',
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  async checkPassword(aPassword: string) {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (err: any) {
      console.log(err);
    }
  }
}
