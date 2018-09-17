const HTMLParser = require('fast-html-parser');

const arenasList = (responseText) => {
  const root = HTMLParser.parse(responseText);
  const listObject = root.querySelectorAll('.Content a');
  const list = listObject.map(i => ({
    name: i.childNodes[0].rawText,
    url: i.rawAttrs.replace('href=', '').replace(/"/g, ''),
  }));
  return list;
};

const sportsList = (responseText) => {
  const root = HTMLParser.parse(responseText);
  const listObject = root.querySelectorAll('.LSport b');
  const list = listObject.map(i => ({
    name: i.childNodes[0].rawText,
  }));
  return list;
};

const leaguesList = (responseText, sport) => {
  const root = HTMLParser.parse(responseText);
  const listObject = root.querySelectorAll('.LTable tr');
  const isNotLeague = root.querySelectorAll('h3');
  const allLeagues = [];
  let list;
  if (listObject.length > 0 && isNotLeague.length > 0) {
    if (isNotLeague[0].childNodes[0].rawText.includes('ZAR ')) {
      allLeagues.push({ [isNotLeague[0].childNodes[0].rawText.replace(' Current Leagues', '')]: [] });
    }
    listObject.map((x) => {
      if (x.childNodes[1].childNodes[3]) {
        allLeagues.push({ [x.childNodes[1].childNodes[3].childNodes[0].rawText]: [] });
      }
      const arra =
     allLeagues[allLeagues.length - 1][Object.keys(allLeagues[allLeagues.length - 1])[0]];
      if (x.childNodes[1].childNodes[0].rawText.length > 7) {
        const leagueFullTitle = x.childNodes[1].childNodes[0].rawText.replace(/[\n|\r|\t]/g, '');
        const leagueSplit = leagueFullTitle.split('-');
        arra.push({
          league: leagueSplit[0].trim(),
          season: leagueSplit[1].trim(),
          division: leagueSplit[2] ? leagueSplit.slice(2, leagueSplit.length).toString().trim().replace(/amp;/g, '') : leagueSplit[1].trim(),
        });
      }
      if (x.childNodes[3]) {
        Object.assign(arra[arra.length - 1], { fixtures: x.childNodes[3].childNodes[0].rawAttrs.replace('class="LFixtures" href=', '').replace(/"/g, '').replace(/amp;/g, '') });
      }
      if (x.childNodes[5]) {
        Object.assign(arra[arra.length - 1], { standings: x.childNodes[5].childNodes[0].rawAttrs.replace('class="LStandings" href=', '').replace(/"/g, '').replace(/amp;/g, '') });
      }
      return arra;
    });
    list = allLeagues.filter((o) => {
      let s;
      if (Object.keys(o)[0] === sport) {
        s = Object.values(o)[0];
      }
      return s;
    })[0][sport];
  } else {
    list = [];
  }
  return list;
};

const leaguesUrls = async (responseText, sport) => {
  const list = leaguesList(responseText, sport);

  return [...new Set(list.map(l => l.standings.replace(/([^&]*)$/g, '')))];
};

const teamsList = (responseText) => {
  const root = HTMLParser.parse(responseText);
  const listObject = root.querySelectorAll('.STTable tr.STRow');
  const list = listObject.map(i =>
    ({
      team: i.childNodes[1].childNodes[0].childNodes[0].rawText.replace(/amp;/g, ''),
      teamUrl: i.childNodes[1].childNodes[0].rawAttrs.replace('HREF=', '').replace(/"/g, '').replace(/amp;/g, ''),
      played: i.childNodes[2].childNodes[0].rawText,
      wins: i.childNodes[3].childNodes[0].rawText,
      losses: i.childNodes[4].childNodes[0].rawText,
      points: (i.childNodes[13]) ?
        i.childNodes[13].childNodes[0].childNodes[0].rawText :
        i.childNodes[11].childNodes[0].rawText,
      pointsBreakdown: (i.childNodes[13] && i.childNodes[13].childNodes[1]) ? (
        i.childNodes[13].childNodes[1].childNodes[2].childNodes.map(n => ({
          match: n.childNodes[0].rawText.replace(/amp;/g, ''),
          points: (n.childNodes[1]) ? n.childNodes[1].rawText
            .replace('\n                for Win', ' for Win |')
            .replace('\n                for Draw', ' for Draw |')
            .replace(/\n/g, '')
            .replace(')                ', ') |')
            .replace(')                ', ') |')
            .replace(')                ', ') |')
            .replace(')                ', ') |') : '',
        }))
      ) : null,
    }));

  return list;
};

const fixturesList = (responseText) => {
  const root = HTMLParser.parse(responseText);
  const listObject = root.querySelectorAll('.FTable');
  const all = [];
  listObject.map((i) => {
    const m = [];
    const obj = { date: i.childNodes[0].childNodes[0].childNodes[0].rawText };
    i.childNodes.map((j) => {
      const matches = {};
      return j.childNodes.map((k) => {
        if (k.rawAttrs === 'class="FDate"') matches.time = k.childNodes[0].rawText;
        if (k.rawAttrs === 'class="FPlayingArea"') matches.court = k.childNodes[0].rawText;

        if (k.rawAttrs === 'class="FHomeTeam"') matches.homeTeam = (k.childNodes[0].childNodes) ? k.childNodes[0].childNodes[0].rawText.replace(/amp;/g, '') : '';
        if (k.rawAttrs === 'class="FHomeTeam"') matches.homeTeamUrl = (k.childNodes[0].childNodes) ? k.childNodes[0].rawAttrs.replace('href=', '').replace(/"/g, '').replace(/amp;/g, '') : '';

        if (k.rawAttrs === 'class="FAwayTeam"') matches.awayTeam = (k.childNodes[0].childNodes) ? k.childNodes[0].childNodes[0].rawText.replace(/amp;/g, '') : '';
        if (k.rawAttrs === 'class="FAwayTeam"') matches.awayTeamUrl = (k.childNodes[0].childNodes) ? k.childNodes[0].rawAttrs.replace('href=', '').replace(/"/g, '').replace(/amp;/g, '') : '';

        return m.push(matches);
      });
    });
    return all.push({ ...obj, data: [...new Set(m)] });
  });

  const filter = all.map(al => ({
    date: al.date,
    data: al.data.filter(a => Object.keys(a).length > 1),
  }));
  return [...new Set(filter)];
};

const resultsList = (responseText) => {
  const root = HTMLParser.parse(responseText);
  const listObject = root.querySelectorAll('.FTable');
  const all = [];
  listObject.map((i) => {
    const m = [];
    const obj = { date: i.childNodes[0].childNodes[0].childNodes[0].rawText };
    i.childNodes.map((j) => {
      const matches = {};
      return j.childNodes.map((k) => {
        if (k.rawAttrs === 'class="FDate"') matches.time = k.childNodes[0].rawText;
        if (k.rawAttrs === 'class="FPlayingArea"') matches.court = k.childNodes[0].rawText;

        if (k.rawAttrs === 'class="FHomeTeam"') matches.homeTeam = (k.childNodes[0].childNodes[0]) ? k.childNodes[0].childNodes[0].rawText.replace(/amp;/g, '') : '';
        if (k.rawAttrs === 'class="FHomeTeam"') matches.homeTeamUrl = (k.childNodes[0].childNodes[0]) ? k.childNodes[0].rawAttrs.replace('href=', '').replace(/"/g, '').replace(/amp;/g, '') : '';

        if (k.rawAttrs === 'class="FScore"') {
          matches.score =
        (k.childNodes[0].childNodes) ? k.childNodes[0].childNodes[0].rawText.replace(/\n\t/g, '') : 'vs';
        }
        if (k.rawAttrs === 'class="FScore"') {
          matches.scoreUrl =
        (k.childNodes[0].childNodes && k.childNodes[0].rawAttrs.includes('href')) ? k.childNodes[0].rawAttrs
          .replace('title="Click on score to open scoresheet" href="javascript: var o = window.open( \'', '')
          .replace('\' )', '').replace('\\', '').replace('"', '') : '/';
        }

        if (k.rawAttrs === 'class="FAwayTeam"') matches.awayTeam = (k.childNodes[0].childNodes[0]) ? k.childNodes[0].childNodes[0].rawText.replace(/amp;/g, '') : '';
        if (k.rawAttrs === 'class="FAwayTeam"') matches.awayTeamUrl = (k.childNodes[0].childNodes[0]) ? k.childNodes[0].rawAttrs.replace('href=', '').replace(/"/g, '').replace(/amp;/g, '') : '';

        return m.push(matches);
      });
    });
    return all.push({ ...obj, data: [...new Set(m)] });
  });

  const filter = all.map(al => ({
    date: al.date,
    data: al.data.filter(a => Object.keys(a).length > 1),
  }));
  return [...new Set(filter)].reverse();
};

const playerList = (responseText) => {
  const root = HTMLParser.parse(responseText);
  const listObject = root.querySelectorAll('.STTable .STRow');
  const allStats = listObject.map((i) => {
    const stats = {};
    stats.player = i.childNodes[0].childNodes[0].childNodes[0].rawText;
    if (i.childNodes[2]) {
      const downOne = (i.childNodes[12]) ? 0 : 1;
      stats.played = i.childNodes[1].childNodes[0].rawText;
      stats.runs = i.childNodes[2].childNodes[0].rawText;
      stats.runsAverage = i.childNodes[3].childNodes[0].rawText;
      stats.strikeRate = i.childNodes[4].childNodes[0].rawText;
      stats.wickets = i.childNodes[7 - downOne].childNodes[0].rawText;
      stats.runsConceded = i.childNodes[9 - downOne].childNodes[0].rawText;
      stats.contribution = i.childNodes[11 - downOne].childNodes[0].rawText;
      stats.contributionAverage = i.childNodes[12 - downOne].childNodes[0].rawText;
    } else {
      stats.played = 'N/A';
      stats.runs = 'N/A';
      stats.runsAverage = 'N/A';
      stats.strikeRate = 'N/A';
      stats.wickets = 'N/A';
      stats.runsConceded = 'N/A';
      stats.contribution = 'N/A';
      stats.contributionAverage = 'N/A';
    }
    return stats;
  });
  const noData = [{
    player: 'No player data',
    played: 'N/A',
    runs: 'N/A',
    runsAverage: 'N/A',
    strikeRate: 'N/A',
    wickets: 'N/A',
    runsConceded: 'N/A',
    contribution: 'N/A',
    contributionAverage: 'N/A',
  }];
  return (allStats.length < 1) ? noData : allStats;
};

module.exports = {
  arenasList,
  sportsList,
  leaguesList,
  leaguesUrls,
  teamsList,
  fixturesList,
  resultsList,
  playerList,
};
