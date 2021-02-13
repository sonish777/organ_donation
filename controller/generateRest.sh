composer identity issue -u $1 -a "resource:org.organdonation.Hospital#$2" -c admin@binita-orgdonation -f $1.card

composer card import -f $1.card

ttab composer-rest-server -c $1@binita-orgdonation -n never -u true -w true -p $3