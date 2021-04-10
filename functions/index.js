const admin = require('firebase-admin');
const functions = require("firebase-functions");
const fetch = require("node-fetch");

require('dotenv').config()

admin.initializeApp();

const functionBuilder = functions.region('europe-west2');

const organisations = [
    'DiogoTheCoder',
    'lendingworks',
    'coval-solutions',
];

const headers = {
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
};

const ONE_DAY = 1000 * 60 * 60 * 24;
exports.generateStats = functionBuilder.https.onRequest(async (request, response) => {
    let repos = [];
    const getRepoCount = async function () {
        for (const organisation of organisations) {
            const resp = await (await fetch(`https://api.github.com/users/${organisation}/repos`, {headers})).json();
            repos = repos.concat(resp);
        }

        return repos.length;
    };

    const getTotalLinesOfCode = async function () {
        let totalLinesOfCode = 0;
        for (const repo of repos) {
            const resp = await (await fetch(`https://api.github.com/repos/${repo['full_name']}/languages`, {headers})).json();
            totalLinesOfCode += Object.values(resp).reduce((a, b) => a + b, 0);
        }

        return totalLinesOfCode;
    };

    const now = new Date();
    const startDate = new Date('2012-01-01');
    const sixteenthBirthday = new Date('2014-11-07 07:00');

    const differenceMs = Math.abs(now - sixteenthBirthday);
    const daysBetween = Math.round(differenceMs / ONE_DAY);

    const repoCount = await getRepoCount();
    const totalLinesOfCode = await getTotalLinesOfCode();
    const numberOfCoffees = daysBetween * 3;
    const yearsOfExperience = now.getFullYear() - startDate.getFullYear();
    const createdAt = now.toISOString();

    admin.firestore()
        .collection('stats')
        .doc(createdAt)
        .set({
            repoCount,
            totalLinesOfCode,
            numberOfCoffees,
            yearsOfExperience,
            createdAt,
        })
        .then((res) => response.send(res));
});

exports.getStats = functionBuilder.https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Cache-Control', 'public, max-age=3600');

    const res = await admin.firestore()
        .collection('stats')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();

    response.send(JSON.stringify(res.docs[0].data()));
});
