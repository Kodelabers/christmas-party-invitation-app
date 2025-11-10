import bcrypt from 'bcryptjs';

  
  const getHash = (plainPassword: string) => {
    const saltRounds = 10;
 
    bcrypt.genSalt(saltRounds, function(err: any, salt: any) {
      bcrypt.hash(plainPassword, salt, function(err: any, hash: string) {
          console.log(`Hash for ${plainPassword} is ${hash}`)
      });
  });
  }

export {
    getHash
};
