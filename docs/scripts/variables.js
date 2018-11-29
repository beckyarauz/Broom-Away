
let soundObjects = {};
let imageObjects = {};
let bossImageObjects = {};

var w = window.innerWidth;
var h = window.innerHeight;

var intro = document.getElementById('intro');
var username = document.getElementById('username');
var game = document.getElementById('game');
var griffindor = document.getElementById('griffindor');
var slytherin = document.getElementById('slytherin');
var ravenclaw = document.getElementById('ravenclaw');
var hufflepuff = document.getElementById('hufflepuff');

var startButton = document.getElementById('start');
var inst = $('#instructions');

var rules1 = $('#rules-1');
var rules2 = $('#rules-2');
var rules3 = $('#rules-3');
var scores = $('#scores');

var nextBtn = $('.next');

var backBtn = $('.back');

var castle = $('.to-start');

var plays = localStorage.getItem('n');
var lastScore = localStorage.getItem(`score-${plays-1}`);
var userName;
var owl;
var background;
var ranBoss;
var gameBoard;
var player;
var finalBoss;
var sprites;
var space;
var spell;
var now;
var last;
var house;
var houses;
var reset;


var upDir;
var rightDir;
var leftDir;
var downDir;
var shootBtn;

var controls;

var controls;
var onGoingTouch = false;

var dementors = [];
var snitchs = [];
var lives = [];
var owls = [];
var bossArr = [];
var spells = [];
var spellsBoss = [];
var scoresArray = [];
var speeds = [1.5, 1.75, 2, 2.5];