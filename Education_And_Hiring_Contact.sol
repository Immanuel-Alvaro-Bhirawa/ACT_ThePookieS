// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EducationAndHiring {
    struct Certificate {
        string courseName;
        string studentName;
        string dateIssued;
    }

    struct Candidate {
        string name;
        string experience;
        string education;
        string[] certificates;
    }

    mapping(address => Certificate[]) public certificates;
    mapping(address => Candidate) public candidates;
    address[] public candidateList;

    event CertificateIssued(address indexed student, string courseName, string dateIssued);
    event CandidateRegistered(address indexed candidate, string name);

    function issueCertificate(address _student, string memory _courseName, string memory _studentName, string memory _dateIssued) public {
        certificates[_student].push(Certificate(_courseName, _studentName, _dateIssued));
        emit CertificateIssued(_student, _courseName, _dateIssued);
    }

    function registerCandidate(address _candidate, string memory _name, string memory _experience, string memory _education) public {
        Candidate storage candidate = candidates[_candidate];
        candidate.name = _name;
        candidate.experience = _experience;
        candidate.education = _education;
        candidateList.push(_candidate);
        emit CandidateRegistered(_candidate, _name);
    }

    function addCertificateToCandidate(address _candidate, string memory _certificate) public {
        candidates[_candidate].certificates.push(_certificate);
    }

    function getCertificates(address _student) public view returns (Certificate[] memory) {
        return certificates[_student];
    }

    function getCandidate(address _candidate) public view returns (Candidate memory) {
        return candidates[_candidate];
    }

    function getCandidateList() public view returns (address[] memory) {
        return candidateList;
    }
}
