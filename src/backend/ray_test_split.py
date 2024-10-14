# #!/usr/bin/env python3
import ray
import time

def fibonacci_iterative(n):
    """Efficiently calculate Fibonacci number iteratively."""
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

@ray.remote
def heavy_task(n):
    # Limit parallel recursion depth to reduce the number of Ray tasks
    if n <= 20:  # Sequential calculation for smaller values to conserve resources
        return fibonacci_iterative(n)
    else:
        # Spawn Ray tasks for larger Fibonacci values
        x = heavy_task.remote(n - 1)
        y = heavy_task.remote(n - 2)
        return ray.get(x) + ray.get(y)

def run_tasks(fib_number, task_count):
    """Runs heavy tasks and returns time taken."""
    # Start timing
    start_time = time.time()

    # Launch tasks in parallel
    results = ray.get([heavy_task.remote(fib_number) for _ in range(task_count)])

    # End timing
    end_time = time.time()
    elapsed_time = end_time - start_time

    return results, elapsed_time

def main():
    fib_number = 25  # Adjust based on available resources
    task_count = 2   # Number of parallel tasks to run

    # Run on laptop only (single-node)
    print("Running on laptop only (single-node):")
    ray.init()  # Initialize Ray locally
    results_local, time_local = run_tasks(fib_number, task_count)
    ray.shutdown()  # Shutdown Ray to reinitialize with cluster

    print("Results (Single-Node):", results_local)
    print(f"Time taken (Single-Node): {time_local:.2f} seconds\n")

    # Run on full cluster
    print("Running on full cluster:")
    ray.init(address='auto')  # Connect to the cluster
    results_cluster, time_cluster = run_tasks(fib_number, task_count)
    ray.shutdown()  # Shutdown Ray after cluster run

    print("Results (Cluster):", results_cluster)
    print(f"Time taken (Cluster): {time_cluster:.2f} seconds")

if __name__ == "__main__":
    main()
