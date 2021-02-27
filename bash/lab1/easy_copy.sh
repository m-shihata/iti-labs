#!/bin/bash

# Script, reads files and insert them into postgres database
# Exit codes
#	0: Success
#	1: Invalid parameter
#	2: File does not exist
#	3: File has no read permission 

#### Check for parameter
if [ ${#} -ne 3 ]
then
	echo "ERROR: Invalid parameter"
	echo "Usage: ${0} <file_name> <database_name> <column_name>"
	exit 1
fi

### Check if DBFile is found
if [ ! -f ${1} ]
then
	echo "ERROR: can not find file ${1}"
	exit 2
fi

### Check if we have DBFIle read permission
if [ ! -r ${1} ]
then
	echo "ERROR: Can not read from file ${1}"
	exit 3
fi

FILENAME=${1}
DATABASE=${2}
TABLENAME=${3}

HEADERS="($(head -n 1 ${FILENAME} | sed 's/:/, /g'))"
echo $HEADERS

export PGPASSWORD=postgres

# Skip Header
SKIP=1

while read RECORD
do
	if [ ${SKIP} -ne 1 ]
	then
		VALUES="($(echo ${RECORD} | sed 's/:/, /g'))"
		echo "${VALUES}"
		psql -U postgres -d ${DATABASE} -c "INSERT INTO ${TABLENAME} ${HEADERS} VALUES ${VALUES}"
	fi
	SKIP=0
done < ${FILENAME}

exit 0
