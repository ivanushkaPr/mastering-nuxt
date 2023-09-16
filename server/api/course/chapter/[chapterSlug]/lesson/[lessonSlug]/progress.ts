import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Endpoint that updates the progress of a lesson
export default defineEventHandler(async (event) => {
    // Only allow PUT, PATCH, or POST requests
    assertMethod(event, ['PUT', 'PATCH', 'POST']);


    // Get the route params
    const { chapterSlug, lessonSlug } = event.context.params;

    // Get the lesson from the DB
    const lesson = await prisma.lesson.findFirst({
        where: {
            slug: lessonSlug,
            Chapter: {
                slug: chapterSlug,
            },
        },
    });

    // If the lesson doesn't exist, throw a 404
    if (!lesson) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Lesson not found',
        });
    }

    // Get the completed value from the request body and update progress in DB
    // Select based on the chapter and lesson slugs
    const { completed } = await readBody(event);
    // Get user email from the supabase user if there is one.
    // const {
    //     user: { email: userEmail },
    // } = event.context;
    return prisma.lessonProgress.upsert({
        where: {
            lessonId_userEmail: {
                lessonId: lesson.id,
                userEmail: 'exitusletalis2008@yandex.ru',
            },
        },
        update: {
            completed,
        },
        create: {
            completed,
            userEmail: 'exitusletalis2008@yandex.ru',
            Lesson: {
                connect: {
                    id: lesson.id,
                },
            },
        },
    });
});
