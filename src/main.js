import { reactive, effect } from './reactive.js';

// 1000 common English words
const words = [
    'a', 'ability', 'able', 'about', 'above', 'accept', 'according', 'account', 'across', 'act',
    'action', 'activity', 'actually', 'add', 'address', 'admit', 'adult', 'affect', 'after', 'again',
    'against', 'age', 'agency', 'agent', 'ago', 'agree', 'agreement', 'ahead', 'air', 'all',
    'allow', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'American', 'among',
    'amount', 'analysis', 'and', 'animal', 'another', 'answer', 'any', 'anyone', 'anything', 'appear',
    'apply', 'approach', 'area', 'argue', 'arm', 'around', 'arrive', 'art', 'article', 'artist',
    'as', 'ask', 'assume', 'at', 'attack', 'attention', 'attorney', 'audience', 'author', 'authority',
    'available', 'avoid', 'away', 'baby', 'back', 'bad', 'bag', 'ball', 'bank', 'bar',
    'base', 'be', 'beat', 'beautiful', 'because', 'become', 'bed', 'before', 'begin', 'behavior',
    'behind', 'believe', 'benefit', 'best', 'better', 'between', 'beyond', 'big', 'bill', 'billion',
    'bit', 'black', 'blood', 'blue', 'board', 'body', 'book', 'born', 'both', 'box',
    'boy', 'break', 'bring', 'brother', 'budget', 'build', 'building', 'business', 'but', 'buy',
    'by', 'call', 'camera', 'campaign', 'can', 'cancer', 'candidate', 'capital', 'car', 'card',
    'care', 'career', 'carry', 'case', 'catch', 'cause', 'cell', 'center', 'central', 'century',
    'certain', 'certainly', 'chair', 'challenge', 'chance', 'change', 'character', 'charge', 'check', 'child',
    'choice', 'choose', 'church', 'citizen', 'city', 'civil', 'claim', 'class', 'clear', 'clearly',
    'close', 'coach', 'cold', 'collection', 'college', 'color', 'come', 'commercial', 'common', 'community',
    'company', 'compare', 'complete', 'computer', 'concern', 'condition', 'conference', 'confidence', 'confirm', 'conflict',
    'consider', 'consumer', 'contact', 'contain', 'continue', 'control', 'conversation', 'convert', 'cook', 'copy',
    'correct', 'cost', 'could', 'council', 'country', 'couple', 'course', 'court', 'cover', 'create',
    'crime', 'cultural', 'culture', 'cut', 'customer', 'dark', 'data', 'date', 'daughter', 'day',
    'dead', 'deal', 'death', 'debate', 'decade', 'decide', 'decision', 'deep', 'defense', 'degree',
    'deliver', 'demand', 'democracy', 'democratic', 'describe', 'design', 'despite', 'destroy', 'detail', 'determine',
    'develop', 'development', 'die', 'difference', 'different', 'difficult', 'dinner', 'direction', 'directly', 'disease',
    'discover', 'discuss', 'discussion', 'disease', 'distance', 'divide', 'doctor', 'door', 'down', 'draw',
    'dream', 'drive', 'drop', 'drug', 'during', 'each', 'early', 'earth', 'east', 'easy',
    'eat', 'economic', 'economy', 'edge', 'education', 'effect', 'effective', 'effectively', 'effort', 'eight',
    'either', 'election', 'else', 'employee', 'empty', 'enable', 'encourage', 'end', 'energy', 'enjoy',
    'enough', 'enter', 'entire', 'environment', 'equal', 'equipment', 'error', 'especially', 'establish', 'event',
    'ever', 'every', 'everybody', 'everyone', 'everything', 'evidence', 'exactly', 'example', 'executive', 'exist',
    'expect', 'experience', 'expert', 'explain', 'eye', 'face', 'fact', 'factor', 'failure', 'fair',
    'fall', 'family', 'famous', 'far', 'fast', 'father', 'fear', 'feature', 'feed', 'feel',
    'feeling', 'few', 'field', 'fight', 'figure', 'file', 'fill', 'film', 'final', 'finally',
    'finance', 'financial', 'find', 'fine', 'finger', 'finish', 'fire', 'firm', 'first', 'fiscal',
    'fish', 'fit', 'five', 'fix', 'focus', 'follow', 'food', 'foot', 'for', 'force',
    'foreign', 'forget', 'form', 'former', 'forward', 'four', 'free', 'friend', 'from', 'front',
    'full', 'fund', 'future', 'game', 'garden', 'general', 'generation', 'get', 'girl', 'give',
    'glass', 'goal', 'go', 'good', 'government', 'grab', 'grade', 'grand', 'grant', 'grass',
    'great', 'green', 'ground', 'group', 'grow', 'growth', 'guess', 'gun', 'guy', 'hair',
    'half', 'hand', 'handle', 'hang', 'happen', 'happy', 'hard', 'have', 'he', 'head',
    'health', 'hear', 'heart', 'heat', 'heavy', 'help', 'her', 'here', 'herself', 'high',
    'him', 'himself', 'his', 'history', 'hit', 'hold', 'home', 'hope', 'horse', 'hospital',
    'hot', 'hotel', 'hour', 'house', 'how', 'however', 'huge', 'human', 'hundred', 'hurt',
    'husband', 'I', 'idea', 'identify', 'if', 'image', 'imagine', 'impact', 'important', 'improve',
    'in', 'include', 'income', 'increase', 'indeed', 'indicate', 'individual', 'industry', 'information', 'inside',
    'instead', 'insure', 'interest', 'interesting', 'international', 'interview', 'into', 'investment', 'involve', 'issue',
    'it', 'item', 'its', 'itself', 'job', 'join', 'just', 'keep', 'key', 'kid',
    'kill', 'kind', 'king', 'kiss', 'know', 'knowledge', 'land', 'language', 'large', 'last',
    'late', 'later', 'laugh', 'law', 'lawyer', 'lay', 'lead', 'leader', 'learn', 'least',
    'leave', 'left', 'legal', 'less', 'let', 'letter', 'level', 'lie', 'life', 'light',
    'like', 'likely', 'line', 'link', 'list', 'listen', 'little', 'live', 'local', 'location',
    'long', 'look', 'lose', 'loss', 'lost', 'love', 'low', 'machine', 'magazine', 'main',
    'maintain', 'major', 'majority', 'make', 'man', 'manage', 'management', 'manager', 'many', 'market',
    'marriage', 'material', 'matter', 'may', 'maybe', 'me', 'mean', 'measure', 'media', 'medical',
    'meet', 'meeting', 'member', 'memory', 'mention', 'message', 'method', 'middle', 'might', 'military',
    'million', 'mind', 'minute', 'miss', 'mission', 'model', 'modern', 'moment', 'money', 'month',
    'more', 'morning', 'most', 'mother', 'motion', 'movement', 'movie', 'mr', 'mrs', 'much',
    'music', 'must', 'my', 'myself', 'name', 'nation', 'national', 'natural', 'nature', 'near',
    'nearly', 'necessary', 'need', 'network', 'never', 'new', 'news', 'newspaper', 'next', 'nice',
    'night', 'no', 'none', 'nor', 'north', 'note', 'nothing', 'notice', 'now', 'number',
    'occur', 'of', 'off', 'offer', 'office', 'officer', 'official', 'often', 'oh', 'oil',
    'ok', 'old', 'on', 'once', 'one', 'only', 'onto', 'open', 'operation', 'opportunity',
    'option', 'or', 'order', 'organization', 'other', 'others', 'our', 'out', 'outside', 'over',
    'own', 'owner', 'page', 'pain', 'painting', 'paper', 'parent', 'part', 'participant', 'particular',
    'particularly', 'partner', 'party', 'pass', 'past', 'patient', 'pattern', 'pay', 'peace', 'people',
    'per', 'perform', 'performance', 'perhaps', 'period', 'person', 'personal', 'phone', 'physical', 'pick',
    'picture', 'piece', 'place', 'plan', 'plant', 'play', 'player', 'PM', 'point', 'police',
    'policy', 'political', 'politics', 'poor', 'popular', 'population', 'position', 'positive', 'possession', 'possible',
    'power', 'practice', 'prepare', 'present', 'president', 'pressure', 'pretty', 'prevent', 'price', 'private',
    'probably', 'problem', 'process', 'produce', 'product', 'production', 'professional', 'professor', 'program', 'project',
    'promise', 'property', 'protect', 'prove', 'provide', 'public', 'pull', 'purpose', 'push', 'put',
    'quality', 'question', 'quickly', 'quite', 'race', 'radio', 'raise', 'range', 'rate', 'rather',
    'reach', 'read', 'ready', 'real', 'reality', 'realize', 'really', 'reason', 'receive', 'recently',
    'recognize', 'record', 'reduce', 'reflect', 'region', 'relate', 'relationship', 'remain', 'remember', 'remove',
    'report', 'represent', 'research', 'resource', 'respond', 'response', 'rest', 'result', 'return', 'reveal',
    'rich', 'right', 'rise', 'risk', 'road', 'rock', 'role', 'room', 'rule', 'run',
    'save', 'say', 'scene', 'school', 'science', 'scientist', 'score', 'sea', 'season', 'seat',
    'second', 'section', 'security', 'see', 'seek', 'seem', 'sell', 'send', 'senior', 'sense',
    'sent', 'series', 'serious', 'serve', 'service', 'set', 'seven', 'several', 'sex', 'sexual',
    'shake', 'share', 'shoot', 'short', 'shot', 'should', 'shoulder', 'show', 'side', 'sign',
    'significant', 'similar', 'simple', 'simply', 'since', 'sing', 'single', 'sister', 'sit', 'site',
    'situation', 'size', 'skill', 'skin', 'small', 'smile', 'so', 'social', 'society', 'soldier',
    'some', 'somebody', 'someone', 'something', 'sometimes', 'somewhat', 'somewhere', 'son', 'soon', 'sort',
    'sound', 'source', 'south', 'southern', 'space', 'speak', 'special', 'specific', 'speech', 'spend',
    'sport', 'spring', 'staff', 'stage', 'stand', 'standard', 'start', 'state', 'statement', 'station',
    'stay', 'step', 'still', 'stock', 'stop', 'store', 'story', 'strategy', 'street', 'strong',
    'structure', 'student', 'study', 'stuff', 'style', 'subject', 'success', 'successful', 'such', 'suddenly',
    'suffer', 'suggest', 'suit', 'summer', 'support', 'sure', 'surface', 'system', 'table', 'take',
    'talk', 'task', 'tax', 'teach', 'teacher', 'team', 'technology', 'television', 'tell', 'ten',
    'tend', 'term', 'test', 'text', 'than', 'thank', 'that', 'the', 'their', 'them',
    'themselves', 'then', 'theory', 'there', 'these', 'they', 'thing', 'think', 'third', 'this',
    'those', 'though', 'thought', 'thousand', 'threat', 'three', 'through', 'throughout', 'throw', 'time',
    'to', 'today', 'together', 'tonight', 'too', 'top', 'total', 'tough', 'toward', 'town',
    'trade', 'traditional', 'training', 'travel', 'treat', 'treatment', 'tree', 'trial', 'trip', 'trouble',
    'true', 'truth', 'try', 'turn', 'tv', 'two', 'type', 'under', 'understand', 'unit',
    'until', 'up', 'upon', 'us', 'use', 'usually', 'value', 'very', 'view', 'violence',
    'visit', 'voice', 'vote', 'wait', 'walk', 'wall', 'want', 'war', 'watch', 'water',
    'way', 'weapon', 'wear', 'week', 'weight', 'well', 'west', 'western', 'what', 'whatever',
    'when', 'where', 'whether', 'which', 'while', 'white', 'who', 'whole', 'whom', 'whose',
    'why', 'wide', 'wife', 'will', 'win', 'wind', 'window', 'wish', 'with', 'within',
    'without', 'woman', 'wonder', 'word', 'work', 'worker', 'world', 'worry', 'would', 'write',
    'writer', 'wrong', 'year', 'yes', 'yet', 'you', 'young', 'your', 'yourself'
];

// Create reactive state
const state = reactive({
    currentIndex: 0,
    isFlipped: false,
    usedIndices: [0] // Initialize with the first word
});

// DOM Elements
const flashcard = document.querySelector('.flashcard');
const wordElement = document.getElementById('word');
const translationElement = document.getElementById('translation');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const randomButton = document.getElementById('random');
const currentElement = document.getElementById('current');
const totalElement = document.getElementById('total');

// Initialize total count
totalElement.textContent = words.length;

// Function to get a random unused index
function getRandomUnusedIndex() {
    const availableIndices = Array.from({ length: words.length }, (_, i) => i)
        .filter(i => !state.usedIndices.includes(i));
    
    if (availableIndices.length === 0) {
        // If all words have been used, reset the used indices
        state.usedIndices = [];
        const newIndex = Math.floor(Math.random() * words.length);
        state.usedIndices.push(newIndex);
        return newIndex;
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    return randomIndex;
}

// Effect to update the UI when state changes
effect(() => {
    const { currentIndex, isFlipped } = state;
    
    // Update word
    wordElement.textContent = words[currentIndex];
    translationElement.textContent = ''; // Empty translation for now
    
    // Update progress
    currentElement.textContent = currentIndex + 1;
    
    // Update card flip state
    if (isFlipped) {
        flashcard.classList.add('flipped');
    } else {
        flashcard.classList.remove('flipped');
    }
    
    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === words.length - 1;
});

// Event Listeners
flashcard.addEventListener('click', () => {
    state.isFlipped = !state.isFlipped;
});

prevButton.addEventListener('click', () => {
    if (state.currentIndex > 0) {
        state.currentIndex--;
        state.isFlipped = false;
    }
});

nextButton.addEventListener('click', () => {
    if (state.currentIndex < words.length - 1) {
        state.currentIndex++;
        state.isFlipped = false;
    }
});

randomButton.addEventListener('click', () => {
    const randomIndex = getRandomUnusedIndex();
    state.currentIndex = randomIndex;
    state.usedIndices.push(randomIndex);
    state.isFlipped = false;
});

// Keyboard Navigation
document.addEventListener('keydown', (event) => {
    // Prevent default behavior for arrow keys and space
    if (['ArrowLeft', 'ArrowRight', ' '].includes(event.code)) {
        event.preventDefault();
    }

    switch (event.code) {
        case 'ArrowLeft':
            if (state.currentIndex > 0) {
                state.currentIndex--;
                state.isFlipped = false;
            }
            break;
        case 'ArrowRight':
            if (state.currentIndex < words.length - 1) {
                state.currentIndex++;
                state.isFlipped = false;
            }
            break;
        case 'Space':
            const randomIndex = getRandomUnusedIndex();
            state.currentIndex = randomIndex;
            state.usedIndices.push(randomIndex);
            state.isFlipped = false;
            break;
    }
});
