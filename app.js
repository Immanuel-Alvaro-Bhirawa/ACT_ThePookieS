document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('Please install MetaMask to use this dApp!');
        return;
    }

    const web3 = new Web3(window.ethereum);
    await ethereum.request({ method: 'eth_requestAccounts' });

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = [
        // Add the contract ABI here
    ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    document.getElementById('issueCertificateForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentAddress = document.getElementById('studentAddress').value;
        const courseName = document.getElementById('courseName').value;
        const studentName = document.getElementById('studentName').value;
        const dateIssued = document.getElementById('dateIssued').value;

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        contract.methods.issueCertificate(studentAddress, courseName, studentName, dateIssued)
            .send({ from: sender })
            .on('receipt', (receipt) => {
                console.log('Certificate issued:', receipt);
            })
            .on('error', (error) => {
                console.error('Error issuing certificate:', error);
            });
    });

    document.getElementById('registerCandidateForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const candidateAddress = document.getElementById('candidateAddress').value;
        const name = document.getElementById('name').value;
        const experience = document.getElementById('experience').value;
        const education = document.getElementById('education').value;

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        contract.methods.registerCandidate(candidateAddress, name, experience, education)
            .send({ from: sender })
            .on('receipt', (receipt) => {
                console.log('Candidate registered:', receipt);
            })
            .on('error', (error) => {
                console.error('Error registering candidate:', error);
            });
    });
});
