import ray
import time

# Initialize Ray (will connect to the existing Ray cluster)
ray.init(address='auto')

@ray.remote
def test_task(x):
    time.sleep(1)
    return x * x

def main():
    # Launch several test tasks
    results = ray.get([test_task.remote(i) for i in range(10)])

    # Print the results
    print("Results:", results)

if __name__ == "__main__":
    main()
