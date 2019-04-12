x=0;
for y in $(cat list.txt);
do
	mv Vector-${x}.svg $y;
	let x=$x+1;
done
