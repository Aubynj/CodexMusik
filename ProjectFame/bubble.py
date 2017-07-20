##This is a bubble sort algorithm implement in Python
lists = [14,6,91,155,0,2,4,1,2,1,4873,556,332,667,88,9,990,0,0,0,123,32,44,33,9,1]
#lists = list(input("Enter the lists and separate by commas: "))


def bu_sort(lists):
    length = len(lists) - 1
    for number in range(length,0,-1):
        for a in range(number):
            if (lists[a] < lists[a+1]):
                temp = lists[a]
                lists[a] = lists[a+1]
                lists[a+1] = temp
        
    

    print(lists)
if __name__ == '__main__':
    bu_sort(lists)
