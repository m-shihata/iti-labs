'''
1- Create class employee with the following characteristics:
    ● Attributes:
        ○ First_name
        ○ Last_name
        ○ Age   
        ○ Department
        ○ Salary
        ○ Static list contains all employee
    
    ● Methods:
        ○ constructor
            ■ Assign values to the instance attributes
            ■ Insert the created object to the list
            ■ Insert new record in table employee in database
        ○ transfer()
            ■ Change employee department
            ■ Update the database record with the update
        ○ fire()
            ■ Remove the employee from the shared list
            ■ Delete its record from the database
        ○ show()
            ■ Prints all employee data
        ○ List_employees()  
            ■ Select all employees and print their data
'''
def connect_db(func):
    def warapper(instance, *args):
        import psycopg2
        con = psycopg2.connect(
            'dbname=foo user=postgres password=postgres')
        cur = con.cursor()
        func(instance, cur, *args)
        con.commit()
        cur.close()
        con.close()
    return warapper
print(f'Added Successfully!')

class Employee:
    table_name = 'employees'
    __employees = []

    def __init__(self, first_name, last_name, age, department, salary):
        # Assign values to the instance attributes
        self.table = type(self).table_name
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.department = department
        self.salary = salary
        # Insert the created object to the list
        type(self).__employees.append(self)
        # Create new employee table in database if not exists
        import psycopg2
        con = psycopg2.connect(
            'dbname=foo user=postgres password=postgres')
        cur = con.cursor()

        cur.execute(f'''
            CREATE TABLE IF NOT EXISTS {self.table} (
                id SERIAL PRIMARY KEY,
                first_name varchar(100),
                last_name varchar(100),
                age INT,
                department varchar(100),
                salary Numeric
            )
        ''')

        # insert a new record in databse
        cur.execute(f'INSERT INTO {self.table} (first_name, last_name, age, department, salary) ' +
                    'VALUES (%s, %s, %s, %s, %s);', (first_name, last_name, age, department, salary,))
        cur.execute(f'SELECT * FROM {self.table};')
        rows = cur.fetchall()
        self.id = rows[-1][0]
        con.commit()
        cur.close()
        con.close()

    @classmethod
    @connect_db
    def transfer(cls, cur, id, new_department):
        cur.execute(f'UPDATE {cls.table_name} SET department = %s WHERE id = %s',
                    (new_department, id,))
        print('Transfered')
        
    @classmethod
    @connect_db
    def fire(cls, cur, id):
        for employee in cls.__employees:
            if employee.id == id:
                cls.__employees.remove(employee)
        cur.execute(f'DELETE FROM {cls.table_name} WHERE id = %s', (id,))
        print('Deletetd')

    @classmethod
    @connect_db
    def show(cls, cur, id):
        cur.execute(f'SELECT * FROM {cls.table_name} WHERE id = %s', (id,))
        row = cur.fetchone()
        print(f'ID: {row[0]}\nName: {row[1]} {row[2]}\n' +
              f'Age: {row[3]}\nDepartment: {row[4]}\nSalary: {row[5]}')

    @classmethod
    @connect_db
    def list_employees(cls, cur):
        cur.execute(f'SELECT * FROM {cls.table_name}')
        rows = cur.fetchall()
        if len(rows) < 1:
            print('No employees added yet!')
        else:
            for row in rows:
                print(f'ID: {row[0]}\nName: {row[1]} {row[2]}\n' +
                      f'Age: {row[3]}\nDepartment: {row[4]}\nSalary: {row[5]}')
                print('---------------')


if __name__ == '__main__':
    # Create employees
    Employee('Muhammad', 'Shihata', 27, 'IT', 12000)    # <- id = 1
    Employee('Kareem', 'Ahemd', 26, 'IT', 10000)        # <- id = 2
    Employee('Kareem', 'Ahemd', 25, 'IT', 8000)         # <- id = 3

    # update it's department
    Employee.transfer(2, 'Marketing')

    # Fire emp2
    Employee.fire(2)

    print('\nShowing emp3 data....')
    print('_____________________\n')
    Employee.show(3)

    print('\nListing all employees data...')
    print('_____________________________\n')
    Employee.list_employees()


# Drop the employees table manually before running this script 
