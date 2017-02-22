import makeFinalStore from 'alt-utils/lib/makeFinalStore';

export default function(alt, storage, storeName) {
	const finalStore = makeFinalStore(alt);

	try {
		alt.bootstrap(storage.get(storeName));
	}
	catch(e) {
		console.error('Failed to bootstrap data', e);
	}
	finalStore.listen(() => {
		/*
		Want to make it possible for you to debug application 
		If you ever want to clear the contents of localStorage
		and prevent data from being saved to it while debugging 
		you can set the debug flag.  This will prevent alt 
		from taking snapshots of your app
		*/
		if(!storage.get('debug')) {
			storage.set(storeName, alt.takeSnapshot());
		}
	});
}