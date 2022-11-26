#!/bin/bash

eslint . --fix

terraform fmt -recursive
