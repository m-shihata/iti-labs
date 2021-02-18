'''
Let the app be use command interface as follow:
    ● Print a menu for the user with the operation he can do and the key word to
      enter for running an operation, for example:
    ● For adding new employee enter “add”
      If manager press “m”/ if employee press ‘e’
      Please insert data
      Name:>>
      Age:>>
      And so on.
    ● The final option in the menu should be q for exiting the program
'''

from employee import Employee
from manager import Manager


def is_mgr_or_emp(operation):
    while True:
        role = input(f"Please, press...\n> 'm': for {operation} manager\n> 'e': for {operation} an employee\n>>> ")
        if role.lower() not in ['e', 'm']:
            continue
        elif role.lower() == 'e':
            return Employee
        else:
            return Manager


while True:
    print('\nPlease select an option by insert the operation number...\n' +
          '> 1: Add new employee\n' +
          '> 2: Transfer an employee to another department using his id \n' +
          '> 3: Delete an employee using his id\n' +
          '> 4: Show infromation about employee using his id\n' +
          '> 5: List all emplyees with their data\n' +
          '> 6: quit\n'
          )
    try:
        option = int(input('>>> '))
    except ValueError:
        option = 0
  

    try:
        if option not in range(1, 7):
            print('Invalid Option!')
            continue

        elif option == 1:
            cls = is_mgr_or_emp("adding")
            first_name = input("First Name: ")
            last_name = input("Last Name: ")
            age = input("Age: ")
            department = input("Department: ")
            salary = input("Salary: ")
            cls(first_name, last_name, age, department, salary)

        elif option == 2:
            cls = is_mgr_or_emp("transfering")
            id = int(input("ID: "))
            new_department = input("New Department: ")
            cls.transfer(id, new_department)

        elif option == 3:
            cls = is_mgr_or_emp("deleting")
            id = int(input("ID: "))
            cls.fire(id)

        elif option == 4:
            cls = is_mgr_or_emp("showing information about")
            id = int(input("ID: ")) 
            cls.show(id)                    
                

        elif option == 5:
            cls = is_mgr_or_emp("get all data of people with role")
            cls.list_employees()

        elif option == 6:
            break
    except:
        print("Something wrong with your")
        continue
        

    option = input('\nDo you want to do another operation? (y/n)\n>>>')
    if option.lower() in ['y', 'yes']:
        continue
    else:
        break
