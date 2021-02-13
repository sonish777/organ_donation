/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organdonation.Setup} setup - the Setup transaction
 * @transaction
 */
function setup(setup) {
    var factory = getFactory();
    var NS = 'org.organdonation';

    // create the donor
    var donor = factory.newResource(NS, 'Donor', 'D123');
    donor.address = "test address";
    donor.firstName = "firstname";
    donor.lastName = "lastname";
    donor.emailId = "test@gmail.com";
    donor.contactNo = "91841429715";
    donor.password = "12345";
    donor.gender = "MALE";

    // create the Unos
    var hotc = factory.newResource(NS, 'Hotc', '00001');

    // create the source hospital
    var sourceHospital = factory.newResource(NS, 'Hospital', 'sHospital123');
    sourceHospital.name = "washington hospital";
    sourceHospital.emailId = "hospital@gmail.com";
    sourceHospital.address = "address";
    sourceHospital.password ="12";

    // create the target hospital
    var destHospital = factory.newResource(NS, 'Hospital', 'tHospital123');
    destHospital.name = "target hospital";
    destHospital.emailId = "hospital@gmail.com";
    destHospital.address = "target address";
    destHospital.password="123";
  
   // create the doctor
     var doctor = factory.newResource(NS, 'Doctor', 'D0123');
     doctor.firstName = "Rita";
     doctor.lastName = "Sharma";
     doctor.emailId = "rita@gmail.com";
     doctor.password = "abc";
     doctor.gender = "FEMALE";
     doctor.level = "MBBS";
     doctor.specialist = true;
     doctor.hospital = factory.newRelationship(NS, 'Hospital', 'sHospital123');
  
    // create the recipient
    var recipient = factory.newResource(NS, 'Recipient', 'R_001');
     recipient.address = "Raddress";
     recipient.firstName = "Sita";
     recipient.lastName = "Thapa";
     recipient.emailId = "sita@gmail.com";
     recipient.password ="abcd";
    recipient.contactNo = "9822222225";
  	recipient.hospital = factory.newRelationship(NS,'Hospital','tHospital123');
     recipient.gender = "FEMALE";
    recipient.organName = "liver";
    return getParticipantRegistry(NS + '.Donor')
        .then(function (donorRegistry) {
            // add the donor
            return donorRegistry.addAll([donor]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Hotc');
        })
        .then(function(htocRegistry) {
            // add the unos
            return htocRegistry.addAll([hotc]);
        })
  		.then(function() {
            return getParticipantRegistry(NS + '.Doctor');
        })
        .then(function(doctorRegistry) {
            // add the hospital
            return doctorRegistry.addAll([doctor]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Hospital');
        })
        .then(function(hospitalRegistry) {
            // add the hospital
            return hospitalRegistry.addAll([sourceHospital]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Hospital');
        })
        .then(function(hospitalRegistry) {
            // add the hospital
            return hospitalRegistry.addAll([destHospital]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Recipient');
        })
        .then(function(recipientRegistry) {
            // add the hospital
            return recipientRegistry.addAll([recipient]);
        })
}






/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organdonation.Offered} offered - the offered Organ details
 * @transaction
 */
async function Offered(offered) {
    // create the organ
    var factory = getFactory();
    var NS = 'org.organdonation';
    var newOrgan = factory.newResource(NS, 'Organ', offered.organId);
    newOrgan.organName = offered.organName;
    newOrgan.donor = offered.donor;
    newOrgan.status = "OFFERED";
    var organRegistry = await getAssetRegistry(NS + '.Organ');
    await organRegistry.addAll([newOrgan]);
}   
/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organdonation.Tested} data - the offered Organ details
 * @transaction
 */
async function Tested(data) {
    // create the organ
    //var factory = getFactory();
    var NS = 'org.organdonation';
    var organ = data.organ;
    var testInfo = data.organTestInfo;
    if(organ.status!= "OFFERED") 
          return
    organ.doctor = data.doctor;
    // var hospitalId = data.hospital.$identifier;
    organ.sourceHospital = data.hospital;
    organ.organTestInfo = testInfo;
    organ.status = "TESTED";
    var organRegistry = await getAssetRegistry(NS + '.Organ');
        // update the donation
    await organRegistry.update(organ);
}    
/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organdonation.Matched} data - the matched Organ details
 * @transaction
 */
async function Matched(data) {
    // create the organ
    //var factory = getFactory();
    var NS = 'org.organdonation';
    var organ = data.organ;
    //var hospitalId = data.hospital.$identifier;
  if(organ.status!= "TESTED") 
      	return
    organ.destHospital = data.hospital;
    organ.recipient = data.recipient;
    organ.status = "MATCHED";
    var organRegistry = await getAssetRegistry(NS + '.Organ');
        // update the donation
    await organRegistry.update(organ);
}    
/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organdonation.Transplant} data - the matched Organ details
 * @transaction
 */
async function Transplant(data) {
    // create the organ
    var factory = getFactory();
    var NS = 'org.organdonation';
    var organ = data.organ;
  	if(organ.status!= "MATCHED") 
      	throw new Error("The organ has not been matched yet !");
    organ.status = "TRANSPLANT";
    var organRegistry = await getAssetRegistry(NS + '.Organ');
        // update the donoation
       await  organRegistry.update(organ);
}