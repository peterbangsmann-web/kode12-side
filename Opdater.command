#!/bin/bash
# Henter den nyeste udgave af Kode12. Kraever internet. Dobbeltklik paa filen i Finder.
cd "$(dirname "$0")"
git pull
echo
echo "Faerdig. Luk vinduet, og genindlaes siden i browseren."
