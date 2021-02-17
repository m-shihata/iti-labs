seq = [0, 1]

def next_num(arr):
    result = arr[-1] + arr [-2]
    return result

while (next_num(seq) < 50):
    seq.append(next_num(seq))

print(seq)
