#!/usr/bin/env python3
import ray
import numpy as np
import time

@ray.remote
def multiply_row_by_column(row, column):
    """Multiply a single row by a single column and return the result."""
    return np.dot(row, column)

def parallel_matrix_multiply(A, B):
    """Perform matrix multiplication of A and B in parallel."""
    # Get dimensions
    num_rows, num_cols = A.shape[0], B.shape[1]

    # Transpose B for easier column access
    B_T = B.T

    # List to hold references to Ray tasks
    result_refs = [
        [multiply_row_by_column.remote(A[i, :], B_T[j, :]) for j in range(num_cols)]
        for i in range(num_rows)
    ]

    # Gather results and form the final matrix
    result = np.array([[ray.get(cell) for cell in row] for row in result_refs])
    return result

def main():
    # Matrix dimensions (adjust size based on memory constraints)
    matrix_size = 100  # e.g., a 100x100 matrix

    # Generate random matrices
    A = np.random.rand(matrix_size, matrix_size)
    B = np.random.rand(matrix_size, matrix_size)

    # Single-node (laptop only) run
    print("Running on laptop only (single-node):")
    ray.init()  # Initialize Ray in local mode
    start_time = time.time()
    result_single = parallel_matrix_multiply(A, B)
    time_single = time.time() - start_time
    ray.shutdown()  # Shutdown Ray to reinitialize with cluster

    print(f"Time taken (Single-Node): {time_single:.2f} seconds\n")

    # Cluster run
    print("Running on full cluster:")
    ray.init(address='auto')  # Connect to the cluster
    start_time = time.time()
    result_cluster = parallel_matrix_multiply(A, B)
    time_cluster = time.time() - start_time
    ray.shutdown()  # Shutdown Ray after cluster run

    print(f"Time taken (Cluster): {time_cluster:.2f} seconds")

    # Check if results match
    if np.allclose(result_single, result_cluster):
        print("Results match between single-node and cluster execution.")
    else:
        print("Results do NOT match between single-node and cluster execution.")

if __name__ == "__main__":
    main()
