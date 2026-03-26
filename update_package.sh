#! /bin/bash
FILE=$(ls | grep .vsix | sort -Vr | head -1)
MAJOR=$(echo $FILE | cut -d '.' -f 1 | cut -d '-' -f 2)
MEDIUM=$(echo $FILE | cut -d '.' -f 2)
MINOR=$(echo $FILE | cut -d '.' -f 3)
case $1 in
    major) MAJOR=$((MAJOR + 1))
    MEDIUM=0
    MINOR=0;;
    medium) MEDIUM=$((MEDIUM + 1))
    MINOR=0;;
    *)MINOR=$((MINOR + 1))
esac
new_file=miniassembly-$MAJOR.$MEDIUM.$MINOR.vsix
echo $new_file
vsce package
mv miniassembly-0.0.1.vsix $new_file
git add $new_file