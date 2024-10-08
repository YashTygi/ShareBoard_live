CREATE TABLE `users` (
	`pathName` text PRIMARY KEY NOT NULL,
	`editorSavedState` text NOT NULL,
	`password` text,
	`read` integer DEFAULT 0 NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_pathName_unique` ON `users` (`pathName`);