# #!/usr/bin/env python3
# import ray
# import torch
# import torch.nn as nn
# import torch.optim as optim
# from torchvision import datasets, transforms
# from torch.utils.data import DataLoader, random_split
# import time

# # Define the model
# class SimpleNN(nn.Module):
#     def __init__(self):
#         super(SimpleNN, self).__init__()
#         self.fc1 = nn.Linear(28 * 28, 128)
#         self.fc2 = nn.Linear(128, 64)
#         self.fc3 = nn.Linear(64, 10)

#     def forward(self, x):
#         x = x.view(-1, 28 * 28)  # Flatten the image
#         x = torch.relu(self.fc1(x))
#         x = torch.relu(self.fc2(x))
#         x = self.fc3(x)
#         return x

# # Training function
# def train_model(model, train_loader, criterion, optimizer, epochs=1):
#     model.train()
#     for epoch in range(epochs):
#         total_loss = 0
#         for data, target in train_loader:
#             optimizer.zero_grad()
#             output = model(data)
#             loss = criterion(output, target)
#             loss.backward()
#             optimizer.step()
#             total_loss += loss.item()
#         print(f"Epoch {epoch+1}, Loss: {total_loss/len(train_loader):.4f}")

# # Ray remote function for parallel training
# @ray.remote
# def train_on_worker(train_loader):
#     model = SimpleNN()
#     criterion = nn.CrossEntropyLoss()
#     optimizer = optim.Adam(model.parameters(), lr=0.001)
#     train_model(model, train_loader, criterion, optimizer, epochs=1)
#     return model.state_dict()

# def load_data():
#     # Load MNIST dataset
#     transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
#     dataset = datasets.MNIST(root='./data', train=True, transform=transform, download=True)
#     train_size = int(0.8 * len(dataset))
#     val_size = len(dataset) - train_size
#     train_dataset, _ = random_split(dataset, [train_size, val_size])
#     train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
#     return train_loader

# def main():
#     # Load the training data
#     train_loader = load_data()

#     # Single-node (laptop only) run
#     print("Running on laptop only (single-node):")
#     ray.init()  # Initialize Ray in local mode
#     model = SimpleNN()
#     criterion = nn.CrossEntropyLoss()
#     optimizer = optim.Adam(model.parameters(), lr=0.001)

#     start_time = time.time()
#     train_model(model, train_loader, criterion, optimizer, epochs=1)
#     time_single = time.time() - start_time
#     ray.shutdown()  # Shutdown Ray to reinitialize with cluster

#     print(f"Time taken (Single-Node): {time_single:.2f} seconds\n")

#     # Cluster run
#     print("Running on full cluster:")
#     ray.init(address='auto')  # Connect to the cluster

#     # Distribute training to 2 workers
#     start_time = time.time()
#     model_states = ray.get([train_on_worker.remote(train_loader) for _ in range(2)])
#     time_cluster = time.time() - start_time
#     ray.shutdown()  # Shutdown Ray after cluster run

#     print(f"Time taken (Cluster): {time_cluster:.2f} seconds")

#     # Compare and print results
#     print("Single-node vs Cluster execution time comparison:")
#     print(f"Single-node: {time_single:.2f} seconds")
#     print(f"Cluster: {time_cluster:.2f} seconds")

# if __name__ == "__main__":
#     main()

# #!/usr/bin/env python3
# import ray
# import torch
# import torch.nn as nn
# import torch.optim as optim
# from torchvision import datasets, transforms
# from torch.utils.data import DataLoader, random_split
# import time

# # Define a more complex model with additional layers
# class ComplexNN(nn.Module):
#     def __init__(self):
#         super(ComplexNN, self).__init__()
#         self.fc1 = nn.Linear(28 * 28, 256)
#         self.fc2 = nn.Linear(256, 128)
#         self.fc3 = nn.Linear(128, 64)
#         self.fc4 = nn.Linear(64, 32)
#         self.fc5 = nn.Linear(32, 10)

#     def forward(self, x):
#         x = x.view(-1, 28 * 28)  # Flatten the image
#         x = torch.relu(self.fc1(x))
#         x = torch.relu(self.fc2(x))
#         x = torch.relu(self.fc3(x))
#         x = torch.relu(self.fc4(x))
#         x = self.fc5(x)
#         return x

# # Training function
# def train_model(model, train_loader, criterion, optimizer, epochs=1):
#     model.train()
#     for epoch in range(epochs):
#         total_loss = 0
#         for data, target in train_loader:
#             optimizer.zero_grad()
#             output = model(data)
#             loss = criterion(output, target)
#             loss.backward()
#             optimizer.step()
#             total_loss += loss.item()
#         print(f"Epoch {epoch+1}, Loss: {total_loss/len(train_loader):.4f}")

# # Ray remote function for parallel training
# @ray.remote
# def train_on_worker(train_loader):
#     model = ComplexNN()
#     criterion = nn.CrossEntropyLoss()
#     optimizer = optim.Adam(model.parameters(), lr=0.001)
#     train_model(model, train_loader, criterion, optimizer, epochs=1)
#     return model.state_dict()

# def load_data(batch_size):
#     # Load MNIST dataset with an increased batch size
#     transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
#     dataset = datasets.MNIST(root='./data', train=True, transform=transform, download=True)
#     train_size = int(0.8 * len(dataset))
#     val_size = len(dataset) - train_size
#     train_dataset, _ = random_split(dataset, [train_size, val_size])
#     train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
#     return train_loader

# def main():
#     # Load the training data with a larger batch size
#     batch_size = 128
#     train_loader = load_data(batch_size)

#     # Single-node (laptop only) run
#     print("Running on laptop only (single-node):")
#     ray.init()  # Initialize Ray in local mode
#     model = ComplexNN()
#     criterion = nn.CrossEntropyLoss()
#     optimizer = optim.Adam(model.parameters(), lr=0.001)

#     start_time = time.time()
#     train_model(model, train_loader, criterion, optimizer, epochs=1)
#     time_single = time.time() - start_time
#     ray.shutdown()  # Shutdown Ray to reinitialize with cluster

#     print(f"Time taken (Single-Node): {time_single:.2f} seconds\n")

#     # Cluster run
#     print("Running on full cluster:")
#     ray.init(address='auto')  # Connect to the cluster

#     # Distribute training to 4 workers
#     start_time = time.time()
#     model_states = ray.get([train_on_worker.remote(train_loader) for _ in range(4)])
#     time_cluster = time.time() - start_time
#     ray.shutdown()  # Shutdown Ray after cluster run

#     print(f"Time taken (Cluster): {time_cluster:.2f} seconds")

#     # Compare and print results
#     print("Single-node vs Cluster execution time comparison:")
#     print(f"Single-node: {time_single:.2f} seconds")
#     print(f"Cluster: {time_cluster:.2f} seconds")

# if __name__ == "__main__":
#     main()



#!/usr/bin/env python3
import ray
import torch
import time
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# Initialize Ray (will connect to the existing Ray cluster)
ray.init(address='auto')

# Define the CNN model
class CNNModel(nn.Module):
    def __init__(self):
        super(CNNModel, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 8 * 8, 512)
        self.fc2 = nn.Linear(512, 10)  # 10 classes for CIFAR-10

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)  # Flatten the tensor
        x = torch.relu(self.fc1(x))
        return self.fc2(x)

# Training function
@ray.remote
def train_model_on_worker(train_loader, epochs=1):
    model = CNNModel()  # Instantiate the model on each worker
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters())

    model.train()
    for epoch in range(epochs):
        total_loss = 0.0
        for batch_idx, (data, target) in enumerate(train_loader):
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        print(f'Epoch {epoch + 1}, Loss: {total_loss / len(train_loader):.4f}')

# Main function
def main():
    # Data transformations
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
    ])

    # Load CIFAR-10 datasets
    train_dataset = datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

    # Train on single-node
    print("Running on laptop only (single-node):")
    start_time = time.time()
    # Call the remote function for single-node training
    ray.get(train_model_on_worker.remote(train_loader, epochs=5))  # Train model on local machine
    end_time = time.time()
    print(f"Time taken (Single-Node): {end_time - start_time:.2f} seconds")

    # Train on the full cluster
    print("\nRunning on full cluster:")
    start_time = time.time()
    ray.get(train_model_on_worker.remote(train_loader, epochs=5))  # Train model on Ray cluster
    end_time = time.time()
    print(f"Time taken (Cluster): {end_time - start_time:.2f} seconds")

if __name__ == "__main__":
    main()
