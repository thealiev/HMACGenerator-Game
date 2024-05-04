# Rock-Paper-Scissors Game with HMAC Verification

This project is a Node.js implementation of the classic rock-paper-scissors game, enhanced with cryptographic security features using HMAC (Hash-based Message Authentication Code) to ensure fair play. The game allows players to challenge the computer in a secure and verifiable manner, preventing any party from gaining an unfair advantage by predicting or revealing moves prematurely.

Features
Secure Key Generation: Utilizes cryptographic functions to generate secure random keys.
HMAC Generation: Ensures the integrity and authenticity of the game moves through HMAC.
Interactive Gameplay: Players can interact with the game through a command-line interface.
Help System: Offers an in-game help system that displays possible moves and outcomes.
Game Rules Logic: Implements a dynamically generated rule set for determining the outcome between different moves.
Requirements
Node.js (Version 12.0.0 or later recommended)
Installation
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/rock-paper-scissors-hmac.git
cd rock-paper-scissors-hmac
Usage
To start the game, run the script with Node.js, providing an odd number of unique moves greater than or equal to 3:

bash
Copy code
node game.js rock paper scissors lizard spock
You will be prompted with the available moves and can select your move by entering the corresponding number. Enter 0 to exit the game or ? to display the help table.

How It Works
Key and HMAC Generation: At the start of each game, a secure key is generated, and an HMAC is created based on the computer's move. This HMAC is shown to the player to verify the move's integrity after the game.
User Interaction: The player makes a move, the results are displayed, and the HMAC key is revealed at the end to ensure the move was not altered.
Game Rules: The game rules dynamically determine the outcome based on the moves chosen by the player and the computer.
Contributing
Contributions to this project are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
