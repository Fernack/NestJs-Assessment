import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { createConnection } from 'mysql';
import { ConfigService } from '@nestjs/config';
import { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } from 'src/config/constants';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
    private connection: any;

    constructor(config: ConfigService) {
      this.connection = createConnection({
        host: config.get<string>(DATABASE_HOST),
        user: config.get<string>(DATABASE_USER),
        password: config.get<string>(DATABASE_PASSWORD),
        database:  config.get<string>(DATABASE_NAME),
        insecureAuth : true
      });
    
      this.connection.connect(); 
    }

    async addNewUser(dto: CreateUserDto) {
      return new Promise(async (resolve, reject) => { 
        const user = await this.findOne(dto.username);

        if (user) {
          reject('User already registered with username');
        }
        else {
          let sql = 'INSERT INTO user (username, password) VALUES (?, ?);',
            values = [dto.username, await hash(dto.password, 10)],
            me = this;

          this.connection.query(sql, values, function (error) {
            if (error) {
              reject(error.message);
            }
            else {
              sql = 'INSERT INTO profile (name, addressId, userId) VALUES (?, ?, LAST_INSERT_ID());';

              values = [dto.name, dto.addressId.toString()];
              
              me.connection.query(sql, values, function (error) {
                if (error) {
                  reject(error.message);
                }
                else {
                  resolve();
                }
              });
            }
          });
        }
      });
    }
   
    findOne(username: string):any{
      return new Promise((resolve, reject) => { this.connection.query('select user.id, user.username, user.password, profile.name, street, city.name as city, country.name as country from profile INNER JOIN user ON userId = user.id INNER JOIN address ON addressId = address.id INNER jOIN city on cityId = city.id INNER JOIN country ON countryId = country.id where username = ?', [username], function (error, results, fields) {
          if (error) {
            reject(error.message);
          }
          else {
            resolve(results[0]);
          }
        });        
    });
  }

}




  

