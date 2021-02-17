def bubbleSort(list): 
    n = len(list) 

    for i in range(n-1): 
        for j in range(0, n-i-1): 
            if list[j] > list[j+1]: 
                temp = list[j+1] 
                list[j+1] = list[j]
                list[j] = temp 
    return list

unorderd_list = [64, 34, 25, 12, 22, 11, 90]
print(bubbleSort(unorderd_list))
