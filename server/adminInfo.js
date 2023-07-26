/* //INSERTING ADMIN DATA--




      const adminData = [
        { county: 'Baringo', password: 'one' },
        { county: 'Bomet', password: 'two' },
        { county: 'Bungoma', password: 'three' },
        { county: 'Busia', password: 'four' },
        { county: 'Elgeyo/Marakwet', password: 'five' },
        { county: 'Embu', password: 'six' },
        { county: 'Garissa', password: 'seven' },
        { county: 'Homa Bay', password: 'eight' },
        { county: 'Isiolo', password: 'nine' },
        { county: 'Kajiado', password: 'ten' },
        { county: 'Kakamega', password: 'eleven' },
        { county: 'Kericho', password: 'twelve' },
        { county: 'Kiambu', password: 'thirteen' },
        { county: 'Kilifi', password: 'fourteen' },
        { county: 'Kirinyaga', password: 'fifteen' },
        { county: 'Kisii', password: 'sixteen' },
        { county: 'Kisumu', password: 'seventeen' },
        { county: 'Kitui', password: 'eighteen' },
        { county: 'Kwale', password: 'nineteen' },
        { county: 'Laikipia', password: 'twenty' },
        { county: 'Lamu', password: 'twenty-one' },
        { county: 'Machakos', password: 'twenty-two' },
        { county: 'Makueni', password: 'twenty-three' },
        { county: 'Mandera', password: 'twenty-four' },
        { county: 'Marsabit', password: 'twenty-five' },
        { county: 'Meru', password: 'twenty-six' },
        { county: 'Migori', password: 'twenty-seven' },
        { county: 'Mombasa', password: 'twenty-eight' },
        { county: 'Murang\'a', password: 'twenty-nine' },
        { county: 'Nairobi City', password: 'thirty' },
        { county: 'Nakuru', password: 'thirty-one' },
        { county: 'Nandi', password: 'thirty-two' },
        { county: 'Narok', password: 'thirty-three' },
        { county: 'Nyamira', password: 'thirty-four' },
        { county: 'Nyandarua', password: 'thirty-five' },
        { county: 'Nyeri', password: 'thirty-six' },
        { county: 'Samburu', password: 'thirty-seven' },
        { county: 'Siaya', password: 'thirty-eight' },
        { county: 'Taita/Taveta', password: 'thirty-nine' },
        { county: 'Tana River', password: 'forty' },
        { county: 'Tharaka-Nithi', password: 'forty-one' },
        { county: 'Trans Nzoia', password: 'forty-two' },
        { county: 'Turkana', password: 'forty-three' },
        { county: 'Uasin Gishu', password: 'forty-four' },
        { county: 'Vihiga', password: 'forty-five' },
        { county: 'Wajir', password: 'forty-six' },
        { county: 'West Pokot', password: 'forty-seven' },
      ];
      
      // Function to hash passwords in adminData
      const hashAdminPasswords = async () => {
        try {
          const saltRounds = 10;
          for (const admin of adminData) {
            const hashedPass = await bcrypt.hash(admin.password, saltRounds);
            admin.password = hashedPass;
          }
        } catch (error) {
          console.error('Error hashing passwords:', error);
        }
      };
      
      // Call the function to hash passwords
      hashAdminPasswords().then(() => {
        // Insert the adminData into the database after hashing passwords
        Admin.insertMany(adminData)
          .then(() => {
            console.log('Data inserted successfully');
          })
          .catch((error) => {
            console.error('Error inserting data:', error);
          })
          .finally(() => {
            // Close the database connection
            mongoose.connection.close();
          });
      }); */