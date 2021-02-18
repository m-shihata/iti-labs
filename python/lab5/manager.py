'''
2- create class manager with following characteristics
    ● Class manager inherits from class employee with additional attribute
        Managed_department
    ● methods :
        ○ show()
            ■ Will print all data except the salary will print confidential instead of the
                salary value
'''
from employee import Employee, connect_db


class Manager(Employee):
    table_name = 'managers'

    @classmethod
    @connect_db
    def show(cls, cur, id):
        cur.execute(f'SELECT * FROM {cls.table_name} WHERE id = %s', (id,))
        row = cur.fetchone()
        print(f'ID: {row[0]}\nName: {row[1]} {row[2]}\n' +
                f'Age: {row[3]}\nDepartment: {row[4]}\nSalary: Confidential')


if __name__ == '__main__':
    Manager('Muhammad', 'Shihata', 27, 'IT', 12000) # <- 1
    print('\nShowing mgr1 data....')
    print('_____________________\n')
    Manager.show(1)
