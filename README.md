# ABOUT

This is a command-line interface (CLI) tool which encode and decode a text by Caesar cipher.

# USAGE EXAMPLE

CLI tool accept four options (short alias and full name):

-s, --shift: a shift
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode

```sh
$ node app -a encode -s 7 -i "./input.txt" -o "./output.txt"
$ node app --action encode --shift 7 --input plain.txt --output encoded.txt
$ node app --action decode --shift 7 --input decoded.txt --output plain.txt
```

input.txt
This is secret.
output.txt
Aopz pz zljyla.
