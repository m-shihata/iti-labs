LIST1 = [1, 5, 7, 9]
LIST2 = [2, 4, 5, 5, 7, 9]

def is_distinct(seq):
    if len(seq) == len(set(seq)):
        return True
    else:
        return False

print(is_distinct(LIST1)) #-> True
print(is_distinct(LIST2)) #-> False