let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}
// GET request: Retrieve all users
router.get("/",(req,res)=>{
      // Copy the code here
      res.send(users)//This line is to be replaced with actual return value
    });
    
    // GET by specific ID request: Retrieve a single user with email ID
    router.get("/:email",(req,res)=>{
      // Copy the code here
      const email =  req.params.email;
      let filtered_users = users.filter((user) => user.email === email);
      res.send(filtered_users)//This line is to be replaced with actual return value
    });
    
    
    // POST request: Create a new user
    router.post("/",(req,res)=>{
      users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
    // Send a success message as the response, indicating the user has been added
    res.send("The user " + req.query.firstName + " has been added!");
    });
    
    
    // PUT request: Update the details of a user by email ID
    router.put("/:email", (req, res) => {
      const email = req.params.email;
        let filtered_users = users.filter((user) => user.email === email);
        
        if (filtered_users.length > 0) {
            // Select the first matching user and update attributes if provided
            let filtered_user = filtered_users[0];
            
             // Extract and update DOB if provided
            
            let DOB = req.query.DOB;    
            if (DOB) {
                filtered_user.DOB = DOB;
            }
            
            /*
            Include similar code here for updating other attributes as needed
            */
            
            // Replace old user entry with updated user
            users = users.filter((user) => user.email != email);
            users.push(filtered_user);
            
            // Send success message indicating the user has been updated
            res.send(`User with the email ${email} updated.`);
        } else {
            // Send error message if no user found
            res.send("Unable to find user!");
        }
    });
    
    
    // DELETE request: Delete a user by email ID
    router.delete("/:email", (req, res) => {
       // Extract the email parameter from the request URL
       const email = req.params.email;
       // Filter the users array to exclude the user with the specified email
       users = users.filter((user) => user.email != email);
       // Send a success message as the response, indicating the user has been deleted
       res.send(`User with the email ${email} deleted.`);
    });
module.exports=books;
