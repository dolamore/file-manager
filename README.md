# File Manager

## Description

This is a command-line based file manager built using Node.js (version 22.9.0 or above). It provides basic file operations, information retrieval about the host machine, hash calculations, and file compression and decompression using Streams API, all without any external dependencies.

## Features

Navigate through directories.
Perform file operations: copy, move, rename, and delete.
Read file contents using streams.
Retrieve information about the operating system.
Calculate hash values of files.
Compress and decompress files using Brotli algorithm.

## Prerequisites

Node.js version 22.9.0 or higher.
No external dependencies are required.

## Installation

Clone the repository:

`git clone <your-repo-url>`

Navigate to the project directory:

`cd file-manager`

## Usage

To start the File Manager:

`npm run start -- --username=your_username`

## Commands

### Navigation & Working Directory (nwd)

Go upper from current directory:

`up`

Go to dedicated folder from current directory (path_to_directory can be relative or absolute):

`cd path_to_directory`

Print in console list of all files and folders in current directory:

`ls`

### Basic operations with files (fs)

Read file and print it's content in console:

`cat path_to_file`

Create empty file in current working directory:

`add new_file_name`

Rename file:

`rn path_to_file new_filename`

Copy file:

`cp path_to_file path_to_destination`

Move file:

`mv path_to_file path_to_destination`

Delete file:

`rm path_to_file`

### Operating system info (os)

Get EOL (default system End-Of-Line) and print it to console:

`os --EOL`

Get host machine CPUs info and print it to console:

`os --cpus`

Get home directory and print it to console:

`os --homedir`

Get current system username and print it to console

`os --username`

Get CPU architecture for which Node.js binary has compiled and print it to console:

`os --architecture`

### Hash calculation (hash)

Calculate hash for file and print it into console:

`hash path_to_file`

### Compression & Decompression (zip)

Compress file using Brotli algorithm:

`compress path_to_file path_to_destination`

Decompress file using Brotli algorithm:

`decompress path_to_file path_to_destination`



