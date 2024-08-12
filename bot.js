const scriptName = "sharosu bot";

const notStaffError = ()=> {
    const error = new Error("직원만 사용할 수 있는 명령어입니다.");
    return error;
};

const syntaxError = () => {
    const error = new Error("잘못된 형식의 명령어입니다.");
    return error;
};

const gameReservationInterface = () => {
    const context = {
        gameCount: 1,
        reservationMap: new Map([["A3", "19:00"]]),
        reserve: (nicknamesString, timeInput) => {
            const time = timeInput ? timeInput : "현장";
            const nicknames = nicknamesString.split(",");
            for (nickname of nicknames) {
                context.reservationMap.set(nickname, time);
            }
        },
        cancelReservation: (nicknamesString) => {
            const nicknames = nicknamesString.split(",");
            for (nickname of nicknames) {
                const index = context.reservationMap.delete(nickname);
            }
        },
        reserveNextGame: () => {
            context.gameCount++;
            context.reservationMap.clear();
        },
        endToday: () => {
            context.gameCount = 1;
            context.reservationMap.clear();
            context.reservationMap.set("A3", "19:00");
        }
    };

    return context;
};

const createMonster = () => {
    const monsterReservation = gameReservationInterface();

    const getGameInformation = () =>
        "🏴‍☠️Final Nine 4ㅑ로수길 🏴‍☠️\n" +
        "🎲Monster stack game\n\n" +
        "▪️" + monsterReservation.gameCount + "부▪️\n\n" +
        "⬛️◼️◾️▪️▪️◾️◼️⬛️\n" +
        "▪️7엔트리당 시드 10만\n" +
        "◾️300만칩 시작 (150BB)\n" +
        "▪️리바인 2회 (400만칩)\n" +
        "◾️획득시드 2만당 몬스터 승점 1점\n" +
        "▪️바인,리바인시 몬스터 승점 1점\n" +
        "⬛️◼️◾️▪️▪️◾️◼️⬛️\n\n" +
        (monsterReservation.gameCount == 1 ? "‼️1부 한정 얼리칩 +40‼️\n\n" : "") +
        "❕예약자 명단 (최소 6포 이상/12포 밸런싱 )\n" +
        "📢빠르고 원활한 게임진행을 위해\n" +
        "예약시 방문예정 시간대를 함께 기재 부탁드립니다\n\n" +
        reservationListToString() + "\n\n" +
        "⬛️ 문의사항은 핑크왕관에게 1:1톡 주세요";

    const reservationListToString = () => {
        let result = '';

        for ([key, value] of monsterReservation.reservationMap) {
            result += '◾️ ' + key + " " + value + '\n';
        }

        if (monsterReservation.reservationMap.size >= 10) {
            result += '◾ \n◾ \n';
        } else {
            const repeatCount = 10 - monsterReservation.reservationMap.size;
            for (let i = 0; i < repeatCount; i++) {
                result += '◾️ \n';
            }
        }

        return result;
    };

    return {
        gameName: "몬스터",
        getGameInformation: getGameInformation,
        reserve: monsterReservation.reserve,
        cancelReservation: monsterReservation.cancelReservation,
        reserveNextGame: monsterReservation.reserveNextGame,
        endToday: monsterReservation.endToday
    };
};

const createSitAndGo = () => {
    const sitAndReservation = gameReservationInterface();

    const getGameInformation = () =>
        "🏴‍☠️Final NIne 4ㅑ로수길🏴‍☠️\n" +
        "🎲OTT -Sit & Go  \n\n" +
        "▪️" + sitAndReservation.gameCount + "부▪️\n\n" +
        "⏱️ Duration - 7 min\n\n" +
        "🔳 최소 인원 5명 시작\n" +
        "🔲 데일리와 바인금액 동일 / 시드1만 바인가능\n" +
        "🔳 1등 - 3엔트리당 10,000시드\n" +
        "🔲 1만시드당 주간 데일리 승점 +1점\n" +
        "🔳 바인 200만칩  / 리바인2회 300만칩 \n" +
        "🔲 최소인원 모이면 상시 진행\n\n" +
        "📋예약자 명단(최소 5포 이상)\n" +
        "📢빠르고 원활한 게임진행을 위해\n" +
        "예약시 방문예정 시간대를 함께 기재 부탁드립니다\n\n" +
        reservationListToString() + "\n\n" +
        "⬛️ 문의사항은 핑크왕관에게 1:1톡 주세요";

    const reservationListToString = () => {
        let result = '';

        for ([key, value] of sitAndReservation.reservationMap) {
            result += '◾️ ' + key + " " + value + '\n';
        }

        if (sitAndReservation.reservationMap.size >= 10) {
            result += '◾ \n◾ \n';
        } else {
            const repeatCount = 10 - sitAndReservation.reservationMap.size;
            for (let i = 0; i < repeatCount; i++) {
                result += '◾️ \n';
            }
        }

        return result;
    };

    return {
        gameName: "싯앤고",
        getGameInformation: getGameInformation,
        reserve: sitAndReservation.reserve,
        cancelReservation: sitAndReservation.cancelReservation,
        reserveNextGame: sitAndReservation.reserveNextGame,
        endToday: sitAndReservation.endToday
    };
};

const createWeeklyTournament = () => {
    const weeklyTournamentReservation = gameReservationInterface();

    const getGameInformation = () =>
        "🏴‍☠️Final Nine 4ㅑ로수길 🏴‍☠️\n" +
        "🎲 MTT-Weekly Tournaments \n\n" +
        "⏱️ Duration - 10 min\n\n" +
        "◾️일요일 20:00 시작, 스타트칩 150만\n" +
        "▪️바인 15,000원, 리바인 2회 200만칩\n" +
        "◾️시드바인 가능 , 포인트바인 불가\n\n" +
        "▪️예약 Event▪️\n" +
        "3레벨 이전 사전 예약 참가자들께는\n" +
        "기존 150만칩+ 50만칩\n" +
        "(총 200만칩 제공)\n\n" +
        "⬛️◼️◾️▪️▪️◾️◼️⬛️\n" +
        "•1등: 온라인 토너먼트 참여권 지급\n" +
        "•바인 인원에 따라 시드 차등지급\n" +
        "⬛️◼️◾️▪️▪️◾️◼️⬛️\n\n" +
        "📋예약자 명단 (최소 6포 이상)\n" +
        reservationListToString() + "\n\n" +
        "🔳 문의사항은 핑크왕관에게 1:1톡 부탁드립니다";

    const reservationListToString = () => {
        let result = '';
        let reservationCount = 0;

        for ([key, value] of weeklyTournamentReservation.reservationMap) {
            result += '◾️ ' + key + '\n';
            if (++reservationCount % 10 === 0) {
                result += "🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰\n";
            }
        }

        if (weeklyTournamentReservation.reservationMap.size >= 20) {
            result += '◾ \n◾ \n';
        } else {
            const repeatCount = 20 - weeklyTournamentReservation.reservationMap.size;
            for (let i = 0; i < repeatCount; i++) {
                result += '◾️ \n';
                if (++reservationCount % 10 === 0) {
                    result += "🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰\n";
                }
            }
        }

        return result;
    };

    return {
        gameName: "주간토너",
        getGameInformation: getGameInformation,
        reserve: (nicknamesString, timeInput) => {
            weeklyTournamentReservation.reserve(nicknamesString, timeInput);
        },
        cancelReservation: weeklyTournamentReservation.cancelReservation,
        reserveNextGame: weeklyTournamentReservation.reserveNextGame,
        endToday: weeklyTournamentReservation.endToday
    };
};

const monster = createMonster();
const sitAndGo = createSitAndGo();
const weeklyTournament = createWeeklyTournament();

const checkStaff = (sender) => {
    if (isNotStaff(sender)) {
        throw notStaffError();
    }
};

const isStaff = (sender) => {
    return sender.includes("(Manager)") || sender.includes("(STAFF)") || sender.includes("샤로수길점 대표");
};

const isNotStaff = (sender) => {
    return !isStaff(sender);
};

const isBotRoom = (roomName) => {
    const botRooms = ["bot 샤로수 테스트", "파이널나인 샤로수길점 테스트", "파이널나인 샤로수길점"];
    return botRooms.includes(roomName);
};

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (isBotRoom(room)) {
        const questionCommand = "?샤로수봇";
        const commandList = ["!몬스터", "!싯앤고", "!주토", "!샤로수마감"];
        const msgTokenizer = msg.split(" ");
        try {
            if (commandList.includes(msgTokenizer[0])) {
                let gameType;
                switch (msgTokenizer[0]) {
                    case "!몬스터":
                        gameType = monster;
                        break;
                    case "!싯앤고":
                        gameType = sitAndGo;
                        break;
                    case "!주토":
                        gameType = weeklyTournament;
                        break;
                    case "!샤로수마감":
                        checkStaff(sender);
                        break;
                    default:
                        break;
                }

                if (gameType) {
                    if (msgTokenizer[1]) {
                        switch (msgTokenizer[1]) {
                            case "예약":
                                const time = msgTokenizer[3];
                                gameType.reserve(msgTokenizer[2], time);
                                replier.reply(gameType.getGameInformation());
                                break;
                            case "예약취소":
                                gameType.cancelReservation(msgTokenizer[2]);
                                replier.reply(gameType.getGameInformation());
                                break;
                            case "예약창":
                                replier.reply(gameType.getGameInformation());
                                break;
                            case "다음게임":
                                checkStaff(sender);
                                gameType.reserveNextGame();
                                replier.reply(gameType.getGameInformation());
                                break;
                            default:
                                throw syntaxError();
                        }
                    } else {
                        throw syntaxError();
                    }
                } else {
                    replier.reply("금일 샤로수점 마감하였습니다!\n오늘 방문해주신 샤밀리분들 감사합니다\n오늘 하루도 즐겁게 보내시고 저녁에 파나에서 만나요!");
                    monster.endToday();
                    sitAndGo.endToday();
                    weeklyTournament.endToday();
                }
            } else if (questionCommand === msgTokenizer[0]) {
                const question = msgTokenizer[1];
                if (question === "예약방법") {
                    replier.reply(
                        "!{게임종류} 예약 {닉네임} {도착예정시간}\n" +
                        "예시: !몬스터 예약 샤로수봇 20:00\n" +
                        "예시: !싯앤고 예약 샤로수봇,샤로수봇친구 20:00"
                    );
                }
            }
        } catch(error) {
            replier.reply(error.message);
        }

    }
}

// Below 4 methods are used to modify activity screen
function onCreate(savedInstanceState, activity) {
    const textView = new android.widget.TextView(activity);
    textView.setText("Hello, World!");
    textView.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
