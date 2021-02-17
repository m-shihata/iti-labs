'''
expected shape if n = 9
*
**
***
****
*****
****
***
**
*
'''
n = 9

# Increasing
for i in range(int(n/2)+1):
    for j in range(int(n/2)+1):
        if (j<=i):
            print('*', end='')
    print('')

# Decreasing
for i in range(int(n/2)+1, n):
    for j in range(int(n/2)+1, n):
        if (i<=j):
            print('*', end='')
    print('')
   