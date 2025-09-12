from auth import authenticate_user

username = input("Username: ")
password = input("Password: ")

if authenticate_user(username, password):
    print(f"Login successful. Welcome: {username}!")
else:
    print("Login not successful.")