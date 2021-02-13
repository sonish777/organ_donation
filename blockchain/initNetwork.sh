
composer network install --card PeerAdmin@hlfv1 --archiveFile binita-orgdonation.bna


composer network start --networkName binita-orgdonation --networkVersion 0.0.2-deploy.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import -f networkadmin.card

composer-rest-server -c admin@binita-orgdonation -n never -u true -w true

