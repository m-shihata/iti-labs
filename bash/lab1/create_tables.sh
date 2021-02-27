#!/bin/bash
# >>> YOU HAVE TO EDIT THIS FILE AS NEADED

# >>> DO NOT FORGET TO CHANGE {DATABASENAME}
DATABASE=test
PASSWORD=postgres

# Export PG password to avoid interupption 
export PGPASSWORD=${PASSWORD}

# Create Database if not exists (optional)
psql -U postgres -d postgres -c "DROP DATABASE IF EXISTS ${DATABASE}"
psql -U postgres -d postgres -c "CREATE DATABASE ${DATABASE}"


# DROP Tables if exitsts (Optional)
# psql -U postgres -d ${DATABASE} -c "DROP TABLE IF EXISTS invoice_details"
# psql -U postgres -d ${DATABASE} -c "DROP TABLE IF EXISTS invoices" 

# Create Tables
psql -U postgres -d ${DATABASE} -c "CREATE TABLE invoices (       
    id INT PRIMARY KEY,
    client_name VARCHAR(100),
    total NUMERIC,
    date DATE)"

psql -U postgres -d ${DATABASE} -c "CREATE TABLE invoice_details (
    seq INT PRIMARY KEY,
    inv_id INT NOT NULL REFERENCES invoices(id),
    item VARCHAR(100),
    quantity INT,
    unit NUMERIC
)"

exit 0
